import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonCard = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={580}
    viewBox="0 0 350 580"
    backgroundColor="#c96100"
    foregroundColor="#bc9169"
    {...props}
  >
    <rect x="50" y="10" rx="10" ry="10" width="300" height="358" />
    <rect x="65" y="380" rx="10" ry="10" width="265" height="110" />
    <rect x="85" y="500" rx="11" ry="11" width="225" height="47" />
  </ContentLoader>
);

export default SkeletonCard;
