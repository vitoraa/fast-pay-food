import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

const NewPlace = () => {
  const [name, setName] = useState('');
  const [address, setAdress] = useState('');
  const [type, setType] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/places',
    method: 'post',
    body: { name, address, type },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  }

  return (
    <div>
      <h1>Create a Place</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input value={address} onChange={(e) => setAdress(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input value={type} onChange={(e) => setType(e.target.value)} className="form-control" />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewPlace;