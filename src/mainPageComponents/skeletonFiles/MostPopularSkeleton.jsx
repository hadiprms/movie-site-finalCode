import Skeleton from "react-loading-skeleton";

const MostPopularSkeleton = ({cards}) => {
    return(
        Array(cards).fill(0).map((item , i) => (
        <div className="MP-Skeleton" key={i}>
            <div className="MP-Skeleton-IMG">
                <Skeleton width={170} height={230} />
            </div>
        </div>
        )

    ));
}
export default MostPopularSkeleton;