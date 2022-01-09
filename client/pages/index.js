import Link from 'next/link';
const index = ({ currentUser }) => {
  return (
    <div>
      <h1>FastPayFood</h1>
      <table className="table">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
  )
};

index.getInitialProps = async (context, client, currentUser) => {
}

export default index;