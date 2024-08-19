import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Read() {

    const [apiData, setApiData] = useState([])
    const [search, setSearch] = useState('');
    const [age, setAge] = useState('');

    function getData() {
        axios.get('https://66c1e044f83fffcb587a78fc.mockapi.io/crud')
            .then((response) => {
                setApiData(response.data);
            })
    }

    function handleDelete(id) {
        axios.delete(`https://66c1e044f83fffcb587a78fc.mockapi.io/crud/${id}`)
            .then(() => {
                getData();
            });
    }

    function setDataToStorage(id, name, age, email) {
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('age', age);
        localStorage.setItem('email', email);
    }
    useEffect(() => {
        getData();
    }, [])

    const dropDownData = apiData?.filter((i)=>{
       return i?.e_age === age
    })

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className='mb-2'>
                        <Link to='/create'>
                            <button className='btn btn-primary'>Create New Data</button>
                        </Link>
                    </div>

               <div style={{gap: 8, display: 'flex'}}>


                        <input type="text" className="col-6 mb-2" style={{height: 40}} placeholder="Search" onChange={(e) =>{
                            setSearch(e.target.value)
                        }
} />

  <select name="age" id="age" value={age} style={{marginBottom: '1rem', height: 40}} className='col-6' onChange={(e)=>{console.log(`check age->`, e.target.value); setAge(e.target.value)}}>
    <option value="">None</option>
    <option value="20">20</option>
    <option value="30">30</option>
  </select>
               </div>
               
                    <table className='table table-bordered table-striped table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>AGE</th>
                                <th>EMAIL</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               
                                apiData?.filter((item)=>{
                                    const ageData = age === '' || item?.e_age === age;
                                    const searchData = search === '' || item.e_name.toLowerCase().includes(search) || item.e_name.toUpperCase().includes(search);
                                    return ageData && searchData  
                                 }).map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.e_name}</td>
                                                <td>{item.e_age}</td>
                                                <td>{item.e_email}</td>
                                                <td>
                                                    <Link to='/edit'>
                                                        <button className='btn btn-primary'
                                                            onClick={() => setDataToStorage(item.id, item.e_name, item.e_age, item.e_email)}>EDIT</button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={() => {
                                                        if (window.confirm('Are You Sure To Delete Data ??')) { handleDelete(item.id) }
                                                    }}>DELETE</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Read