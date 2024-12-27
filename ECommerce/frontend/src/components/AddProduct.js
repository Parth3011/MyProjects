import React from 'react'

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false)

    const addProduct = async () => {

        console.warn(!name);
        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }

        // console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter product name" className='inputbox'
                onChange={(e) => { setName(e.target.value) }} value={name} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder="Enter product price" className='inputbox'
                onChange={(e) => { setPrice(e.target.value) }} value={price} />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder="Enter product Category" className='inputbox'
                onChange={(e) => { setCategory(e.target.value) }} value={category} />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type="text" placeholder="Enter product Company" className='inputbox'
                onChange={(e) => { setCompany(e.target.value) }} value={company} />
            {error && !company && <span className='invalid-input'>Enter valid Company</span>}

            <button onClick={addProduct} className='appbutton'>Add Product</button>
        </div>
    )
}


export default AddProduct;