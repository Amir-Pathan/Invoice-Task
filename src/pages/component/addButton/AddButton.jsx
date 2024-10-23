



function AddButton(props){

    const {title,hadleFunc} = props

    return (
        <div className="d-flex" onClick={hadleFunc}>
           <button className="buttonPlus" type="button">+</button>
           <div className="ml-1 text-secondary pointer">{title}</div>
        </div>
    )

}

export default AddButton