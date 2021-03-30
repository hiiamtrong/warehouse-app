import { find, findIndex, get, isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import ItemDetailView from '../components/ItemDetailView'
import withLoading from '../components/Loading'
import useNotify from '../libs/notify'
import Item from '../models/item'
import RestockReport from '../models/restock-report'
import { setItem } from '../reducers/itemSlice'
import { countMobile, fetchById } from '../reducers/restockReportSlice'
import { RootState } from '../reducers/rootReducer'
import { AppDispatch } from '../store'

interface ItemDetailPageProps
  extends RouteComponentProps<{
    id: string
  }> {}

const ItemDetail: React.FC<ItemDetailPageProps> = ({ match }) => {
  const { restockReport, waiting } = useSelector(
    (state: RootState) => state.restockReport
  )
  let { item } = useSelector((state: RootState) => state.item)
  const dispatch: AppDispatch = useDispatch()
  const notify = useNotify()

  const productId = get(match, 'params.productId')
  const restockReportId = get(match, 'params.restockReportId')
  useEffect(() => {
    async function getRestockReportDetail() {
      if (restockReportId) {
        if (isEmpty(restockReport) || restockReport?._id !== restockReportId) {
          const action = fetchById(restockReportId)
          await dispatch(action).catch((err) => {
            notify.errorFromServer(err)
          })
          getProductDetail({ restockReport, productId })
        } else {
          getProductDetail({ restockReport, productId })
        }
      }
    }

    function getProductDetail({
      productId,
      restockReport,
    }: {
      productId: String
      restockReport: RestockReport
    }) {
      const newItem = find(get(restockReport, 'items', []), (item) => {
        return item.product._id === productId
      })

      if (newItem) {
        const action = setItem(newItem)
        dispatch(action)
      }
    }

    getRestockReportDetail()
  }, [])

  async function handleCountMobile({ quantity }: { quantity: number }) {
    const itemIndex = findIndex(restockReport.items, (item: Item) => {
      return item.product._id === productId
    })
    const action = countMobile({ quantity, restockReportId, itemIndex })
    await dispatch(action)
  }

  return withLoading(ItemDetailView)({
    waiting,
    item,
    handleCountMobile,
  })
}

export default ItemDetail
