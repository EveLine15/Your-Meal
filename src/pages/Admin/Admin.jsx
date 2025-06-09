import React from 'react';
import './Admin.scss';
import { useState } from 'react';
import { useAddProductMutation, useGetMenuLengthQuery } from '../../services/firebaseApi';
import { NavLink } from 'react-router';
import { getAuth, signOut } from "firebase/auth";

export default function Admin() {
    const auth = getAuth();
    const [newProduct, setNewProduct] = useState({
        amount: "1",
        name: '',
        description: '',
        calories: '',
        weight: '',
        price: '',
        img: '',
        compos: '',
        category: 0
    });

    const [addProduct] = useAddProductMutation();

    const [loadingImage, setLoadingImage] = useState(false);

    const { data: menuLength } = useGetMenuLengthQuery(newProduct.category, {
        skip: !newProduct.category, // don't run the query if category is not set
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoadingImage(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'unsigned_avatar');

        try {
        const res = await fetch('https://api.cloudinary.com/v1_1/drgjiis7d/image/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setNewProduct(prev => ({ ...prev, img: data.secure_url }));
        } catch (err) {
        console.error('Upload failed', err);
        } finally {
        setLoadingImage(false);
        }
    };

    const addNewProduct = async (e) => {
        e.preventDefault();

        if (!menuLength) return;

        const { category, ...productData } = newProduct;

        try {
            await addProduct({
                category,
                data: productData,
                number: menuLength,
            }).unwrap();
            console.log("added")
        } catch (err) {
            console.error('Ошибка добавления:', err);
        }
    }

    const handleLogOut = () => {
        signOut(auth)
            .catch((error) => {
                console.error(error)
        });
    }

    return (
    <div className="admin-container">
      <h1 className="admin-title">Добавить новый продукт</h1>

      <form className="product-form" onSubmit={addNewProduct}>
        <div className="form-group">
          <label>Название</label>
          <input
            type="text"
            placeholder="Введите название продукта"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Описание</label>
          <textarea
            placeholder="Описание блюда"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Калории</label>
          <input
            type="number"
            placeholder="Количество калорий"
            value={newProduct.calories}
            onChange={(e) => setNewProduct({ ...newProduct, calories: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Вес (в граммах)</label>
          <input
            type="number"
            placeholder="Вес продукта"
            value={newProduct.weight}
            onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Цена (в рублях)</label>
          <input
            type="number"
            placeholder="Цена продукта"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </div>

        <div className="form-group">
            <label>Загрузите изображение</label>
            
            <label htmlFor="file-upload" className="custom-file-upload">
                {loadingImage ? 'Загрузка...' : 'Выбрать файл'}
            </label>
            <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
            />

            {newProduct.img && (
                <div className="image-preview">
                <img src={newProduct.img} alt="preview" />
                </div>
            )}
        </div>

        <div className="form-group">
          <label>Ингредиенты</label>
          <input
            type="text"
            placeholder="Через запятую: Картофель, Масло, Соль"
            value={newProduct.compos}
            onChange={(e) => setNewProduct({ ...newProduct, compos: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Категория</label>
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            <option value="">Выберите категорию</option>
            <option value={0}>Бургеры</option>
            <option value={1}>Закуски</option>
            <option value={2}>Комбо</option>
            <option value={3}>Шаурма</option>
            <option value={4}>Пицца</option>
            <option value={5}>Вок</option>
            <option value={6}>Десерты</option>
            <option value={7}>Соусы</option>
            <option value={8}>Хот-доги</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Добавить продукт</button>
        <NavLink className="log-out" to="/login" onClick={handleLogOut}>Выход</NavLink>
      </form>
    </div>
  );
};
