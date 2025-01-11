import '../scss/utilsCss/spinner.scss'
const Loading = () => {
    return (
        <>
            <div className="spinner">
                <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>
                <div>Loading...</div>
            </div>
        </>
    )
}

export default Loading