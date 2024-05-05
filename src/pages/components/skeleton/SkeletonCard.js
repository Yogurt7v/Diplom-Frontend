import React from "react";
import ContentLoader from "react-content-loader";

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
    <rect x="0" y="25" rx="10" ry="10" width="300" height="358" />
    <rect x="15" y="395" rx="10" ry="10" width="265" height="110" />
    <rect x="35" y="515" rx="11" ry="11" width="225" height="47" />
  </ContentLoader>
);

export default SkeletonCard;
