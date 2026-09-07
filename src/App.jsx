import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRefresh, faTrash,  faWallet } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { useState } from 'react';

export function App() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [expenses, setExpenses]=useState([]);
  const [selectedIndex, setSelectedIndex]=useState([]);

  const handleAddExpense=()=>{
    if(title==='' || amount==='' || category==='' || dateTime===''){
      alert('Please fill all the fields');
    }else{
      const newExpense={
        title:title,
        amount:amount,
        category:category,
        dateTime:dateTime
      }

      setExpenses([...expenses, newExpense])
      alert('Expense added successfully');
    }
    setTitle('');
    setAmount('');
    setCategory('');
    setDateTime('');

  }


  const handleCheckboxChange = (index) => {
  if (selectedIndex.includes(index)) {
    setSelectedIndex(selectedIndex.filter((i) => i !== index));
  } else {
    setSelectedIndex([...selectedIndex, index]);
  }
};


const handleDeleteSelected = () => {
  const updatedExpenses = expenses.filter((expense, index) => !selectedIndex.includes(index));
  setExpenses(updatedExpenses);
  setSelectedIndex([]);
};


const handleClear = () => {
  setTitle('');
  setAmount('');
  setCategory('');
  setDateTime('');
  setExpenses([]);
  setSelectedIndex([]);
}
  

const totalExpense = expenses.reduce((total,expense)=> total + parseFloat(expense.amount),0);

  return(
    <div className="container my-4">
      <div className='row'>
      <div className="border p-3 mb-3 d-flex">

   <FontAwesomeIcon 
    icon={faWallet} 
    style={{color:'#FFC857', fontSize: '2rem'}} 
    className="me-2"
  />

  <div>
    <h4 className="fw-bolder display-6" style={{color:'#2E4052'}}>EXPENSE TRACKER</h4>
      <p style={{color:'#2E4052'}} className='fw-bold'>Track your daily expenses easily.</p>
  </div>
      </div>

      <div>
        <h4 className="fw-bolder" style={{color:'#2E4052'}}>
          ADD NEW EXPENSE 
        </h4>

        <div className="row">
          <div className="col-12 col-md-7">
            <label className="form-label fw-bold">Title</label>
            <input type="text" className="form-control w-50 p-2" value={title} onChange={ (e) => setTitle(e.target.value)}/>
          </div>

          <div className="col-12 col-md-7">
        <label className="form-label fw-bold">Amount ($)</label>
        <input type='number' className="form-control w-50 p-2" value={amount} onChange={ (e) => setAmount(e.target.value)}/>
        </div>

          <div className="col-12 col-md-7">
            <label className="form-label fw-bold">Category</label>
            <select className="form-control form-select w-50 p-2" value={category} onChange={ (e) => setCategory(e.target.value)}>
              
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Electronics">Electronics</option>
              <option value="Home Instructions">Home Instructions</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Others">Others</option>
            </select>
          </div>
           </div>

          <div className="col-12 col-md-7">
            <label className="form-label fw-bold">Date & Time</label>
        <input type='datetime-local' className="form-control w-50 p-2" value={dateTime} onChange={ (e) => setDateTime(e.target.value)}/>
      </div>
      </div>

      <div>
        <button onClick={handleAddExpense} className="btn btn-primary mt-3 me-2" > <FontAwesomeIcon icon={faPlus} /> ADD EXPENSE</button>
        <button onClick={handleDeleteSelected} className="btn btn-danger mt-3 me-2"> <FontAwesomeIcon icon={faTrash} /> DELETE SELECTED</button>
        <button className="btn btn-secondary mt-3" onClick={handleClear}> <FontAwesomeIcon icon={faRefresh} /> CLEAR</button>
      </div>


<h4 className="fw-bolder mt-4 mb-3" style={{color:'#2E4052'}}>
        EXPENSE LIST 
      </h4>

      
      <div className="table-responsive mt-4 mb-5" style={{height: '200px', overflowY: 'auto'}}>
      <table className="table rounded table-bordered table-light table-responsive bg-secondary">
 <thead>
   <tr>
    <th scope="col" className="fw-bold w-20 py-3"></th>
     <th scope="col" className="fw-bold w-20 py-3">Title</th>
     <th scope="col" className="fw-bold w-20 py-3">Amount ($)</th>
     <th scope="col" className="fw-bold w-20 py-3">Category</th>
     <th scope="col" className="fw-bold w-20 py-3">Date & Time</th>
   </tr>
 </thead>
 <tbody>
   {expenses.map((expense, index)=>(
      <tr key={index}className="py-3 text-center align-middle bg-light" >
        <input type="checkbox" className="form-check-input" style={{width: '20px', height: '20px', cursor: 'pointer'}} checked={selectedIndex.includes(index)} onChange={() => handleCheckboxChange(index)}/>
    <td className="py-3">{expense.title}</td>
     <td className="py-3">{expense.amount}</td>
     <td className="py-3">{expense.category}</td>
     <td className="py-3">{expense.dateTime}</td>
      </tr>
   ))}
 </tbody>
</table>
 </div>
      </div>

      <div className="p-3 rounded mb-4" style={{backgroundColor:'#FFC857'}}>
        <h4 className="fw-bolder display-6 text-center" style={{color:'#2E4052'}}>
          TOTAL EXPENSE
          <br/>
          <span className="fw-bold" style={{color:'#2E4052'}}>${totalExpense.toFixed(2)}</span>
        </h4>
      </div>
    </div>
    )
    }
