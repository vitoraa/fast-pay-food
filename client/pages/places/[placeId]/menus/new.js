import { useRouter } from "next/router";
import Router from 'next/router';
import { useState } from "react";
import useRequest from "../../../../hooks/use-request";

const NewMenu = () => {
  const [name, setName] = useState('');

  const router = useRouter();
  const { placeId } = router.query

  const { doRequest, errors } = useRequest({
    url: `/api/places/${placeId}/menus`,
    method: 'post',
    body: { name },
    onSuccess: () => Router.back()
  });

  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  }

  return (
    <div>
      <h1>Create a Menu</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewMenu;