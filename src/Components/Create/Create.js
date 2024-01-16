  import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';

const Create = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const date = new Date();

  const handleSubmit = () => {
    if (!name || !category || !price || !image) {
      setError('Fill in all fields');
      return;
    }

    if (!name.trim() || !category.trim() || !price.trim()) {
      setError(`Please enter valid values for all fields`);
      return;
    }

    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase
            .firestore()
            .collection('products')
            .add({
              name,
              category,
              price,
              phone,
              url,
              userId: user.uid,
              createdAt: date.toDateString(),
            })
            .then(() => {
              history.push('/');
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error uploading image: ', error);
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            type="number"
            id="fname"
            name="Price"
          />
          <br />
          <label htmlFor="fname">phone number</label>
          <br />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="fname"
            name="Price"
          />
          <br />
          <br />
          {image &&
            <img
              alt="Posts"
              width="200px"
              height="200px"
              style={{ marginBottom: '15px' }}
              src={image ? URL.createObjectURL(image) : ''}
            ></img>
          }
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          {error && <p style={{ color: 'red', marginTop: '10px', marginBottom: '0' }}>{error}</p>}
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
