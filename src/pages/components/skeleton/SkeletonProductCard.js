import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonProductCard = (props) => (
  <ContentLoader 
  speed={1}
  width={1600}
  height={700}
  viewBox="0 0 1600 700"
  backgroundColor="#c96100"
  foregroundColor="#bc9169"
  {...props}
>
<rect x="180" y="80" rx="10" ry="10" width="350" height="350" backgroundColor="#000000" /> 
<rect x="560" y="80" rx="10" ry="10" width="815" height="350" /> 
<rect x="180" y="460" rx="10" ry="10" width="1195" height="150" /> 

</ContentLoader>

)

export default SkeletonProductCard