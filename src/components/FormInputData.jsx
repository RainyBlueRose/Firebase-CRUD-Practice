import react, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const FromInputData = () => {
  //form เอาไว้เก็บข้อมูลที่พิมพ์เข้ามาตอนที่จะ Add ข้อมูลหรือทำการแก้ไขข้อมูล
  const [form, setForm] = useState({});
  //data เอาไว้เก็บข้อมูลที่เรียกมาจาก Firebase แบบโดยรวม
  const [data, setData] = useState([]);
  //editId เอาไว้เก็บ id ที่ทำการกดปุ่ม edit
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // loadData();

    const unsubscribe = loadRealTime();
    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddData = async () => {
    await addDoc(collection(db, "khaotang"), form)
      .then((res) => {
        // console.log(res);
        // loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadRealTime = () => {
    const unsubscribe = onSnapshot(collection(db, "khaotang"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    });

    return () => {
      unsubscribe();
    };
  };

  // const loadData = async () => {
  //   await getDocs(collection(db, "khaotang"))
  //     .then((query) => {
  //       const newData = query.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setData(newData);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(collection(db, "khaotang"), id));
      // loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (id) => {
    await updateDoc(doc(collection(db, "khaotang"), id), form);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({});
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="name"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        name="detail"
        placeholder="detail"
        onChange={(e) => handleChange(e)}
      />
      <input
        type=""
        name="price"
        placeholder="price"
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleAddData}>Add Data</button>
      <hr></hr>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Detail</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>

              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={form.name !== undefined ? form.name : item.name}
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  item.name
                )}
              </td>

              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    name="detail"
                    placeholder="detail"
                    value={
                      form.detail !== undefined ? form.detail : item.detail
                    }
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  item.detail
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    name="price"
                    placeholder="price"
                    value={form.price !== undefined ? form.price : item.price}
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  item.price
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <>
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => handleCancel()}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => setEditId(item.id)}>Edit</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FromInputData;
