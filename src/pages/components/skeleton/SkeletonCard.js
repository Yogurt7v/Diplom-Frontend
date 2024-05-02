import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonCard = (props) => (
  <ContentLoader 
  speed={2}
  width={345}
  height={562}
  viewBox="0 0 345 562"
  backgroundColor="#c96100"
  foregroundColor="#bc9169"
  {...props}
>
<rect x="9" y="-1" rx="10" ry="10" width="325" height="358" /> 
    <rect x="30" y="367" rx="10" ry="10" width="285" height="120" /> 
    <rect x="60" y="498" rx="11" ry="11" width="225" height="47" />
  {/* <rect x="44" y="24" rx="0" ry="0" width="250" height="250" />
  <rect x="44" y="282" rx="0" ry="0" width="250" height="50" />
  <rect x="22" y="342" rx="0" ry="0" width="300" height="70" />
  <rect x="70" y="422" rx="0" ry="0" width="200" height="60" /> */}
</ContentLoader>
)

export default SkeletonCard