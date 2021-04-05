import { find, findIndex, get } from 'lodash'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'
import ItemDetailView from '../components/ItemDetailView'
import withLoading from '../components/Loading'
import { AppContext } from '../context'
import useNotify from '../libs/notify'
import Item, { IItem } from '../models/item'

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
        }

        const nextItem: IItem | undefined = restockReport?.items[itemIndex + 1]
        if (nextItem) {
          return (
            <Redirect
              to={`/restock-reports/${restockReportId}/view/${nextItem.product._id}`}
            />
          )
        } else {
          return <Redirect to={`/restock-reports/${restockReportId}`} />
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
