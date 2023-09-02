import React from 'react'
import ContentLoader from 'react-content-loader'

const ReviewSkeleton: React.FC = props => (
    <ContentLoader
        speed={2}
        width={280}
        height={415}
        viewBox="0 50 350 578"
        backgroundColor="#3F4441FF"
        foregroundColor="#626964FF"
        {...props}
    >
        <rect x="45" y="77" rx="10" ry="10" width="300" height="500" />
    </ContentLoader>
)


export default ReviewSkeleton