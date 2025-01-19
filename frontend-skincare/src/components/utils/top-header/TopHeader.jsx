import '../scss/top-header.scss'

const TopHeader = () => {
    return (
    <section className='head'>
        <div className='d_flex'>
            <div className='left row'>
            <i className='fa fa-phone'></i>
            <label> +88012 3456 7894</label>
            <i className='fa fa-envelope'></i>
            <label> Skincare@ui-lib.com</label>
            </div>
        </div>
        </section>
    )
}

export default TopHeader