import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

interface WithLoadingProps {
  waiting: Boolean
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  return function ({ waiting, ...props }: WithLoadingProps & P) {
    return waiting ? (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <ClipLoader size={64} />
        <p>Đang tải...</p>
      </div>
    ) : (
      <Component {...(props as P)} />
    )
  }
}
export default withLoading
