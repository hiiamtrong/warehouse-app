import { every, find, findIndex, get } from 'lodash'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ItemDetailView from '../components/ItemDetailView'
import withLoading from '../components/Loading'
import { AppContext } from '../context'
import useNotify from '../libs/notify'
import Item, { IItem } from '../models/item'
import RestockReport from '../models/restock-report'

const ItemDetail = observer(() => {
  const { itemStore, restockReportStore } = useContext(AppContext)
  const {
    restockReport,
    waiting,
    countMobile,
    fetchById,
    setWaiting,
    setRestockReport,
  } = restockReportStore

  let { item, setItem } = itemStore
  const history = useHistory()
  const notify = useNotify()
  const match = useRouteMatch()

  const productId = get(match, 'params.productId')
  const restockReportId = get(match, 'params.restockReportId')

  useEffect(() => {
    ;(async () => {
      if (!restockReport || restockReportId !== restockReport._id) {
        setWaiting(true)
        await fetchById(restockReportId)
          .catch((err) => {
            notify.errorFromServer(err)
          })
          .finally(() => {
            setWaiting(false)
          })
      }
      const _item = find(restockReport?.items, (item) => {
        return item?.product?._id === productId
      })
      if (_item) {
        setItem(_item)
      }
    })()
  }, [productId, restockReportId])

  function isCountDone(restockReport: RestockReport | undefined) {
    return every(restockReport?.items, (item) => {
      return item.takenQuantity
    })
  }

  function nextNotTakenItem(
    restockReport: RestockReport | undefined
  ): IItem | undefined {
    const index = find(restockReport?.items, (item: Item) => {
      return !item.takenQuantity
    })
    return index
  }

  async function handleCountMobile({ quantity }: { quantity: number }) {
    setWaiting(true)
    await countMobile({ quantity, restockReportId, productId })
      .then((item) => {
        setItem(item)
        const itemIndex = findIndex(restockReport?.items, (item: Item) => {
          return item.product._id === productId
        })

        if (restockReport) {
          restockReport.items[itemIndex] = item
          setRestockReport(restockReport)
          if (isCountDone(restockReport)) {
            return notify.info('Bạn đã lấy hết sản phẩm của restock hiện tại')
          }
        }

        const nextItem: IItem | undefined = nextNotTakenItem(restockReport)

        if (nextItem) {
          history.push(
            `/restock-reports/${restockReportId}/view/${nextItem.product._id}`
          )
        }
      })
      .catch((err) => {
        notify.errorFromServer(err)
      })
      .finally(() => {
        setWaiting(false)
      })
  }
  return (
    <>
      {item &&
        withLoading(ItemDetailView)({
          waiting,
          item,
          handleCountMobile,
        })}
    </>
  )
})
export default ItemDetail
