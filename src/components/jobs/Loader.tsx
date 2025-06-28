import { RotatingLines } from 'react-loader-spinner';

function Loader({ height = 96, width = 96, color = "green", wrapperStyle = { height: "60vh" } }) {
    return (
        <div style={wrapperStyle} className="flex w-full justify-center items-center">
            <RotatingLines
                visible={true}
                height={height}
                width={width}
                strokeColor={color}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )

}

export default Loader;

