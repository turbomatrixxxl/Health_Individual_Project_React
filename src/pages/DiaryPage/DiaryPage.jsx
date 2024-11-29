import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { fetchProducts } from "../../redux/public/operationsPublic";
import { addConsumedProductForSpecificDay, deleteConsumedProductForSpecificDay, fetchConsumedProductsForSpecificDay } from "../../redux/private/operationsPrivate";

import { usePublic } from "../../hooks/usePublic";
import { usePrivate } from "../../hooks/usePrivate";

import LoginStatistics from "../../components/LoginStatistics/LoginStatistics";
import Logo from "../../components/Logo/Logo";
import NavLinks from "../../components/NavLinks/NavLinks";

import { FiCalendar } from "react-icons/fi";

import DiaryAddForm from "../../components/DiaryAddForm/DiaryAddForm";
import Button from "../../components/commonComponents/Button";
import { logOut } from "../../redux/auth/operationsAuth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import Modal from "../../components/commonComponents/Modal/Modal";
import UserLogout from "../../components/UserLogout/UserLogout";

import styles from "./DiaryPage.module.css";

const breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width:768px)",
    desktop: "(min-width:1024px)",
};

export default function DiaryPage() {
    const isMobile = useMediaQuery({ query: breakpoints.mobile })
    const isTablet = useMediaQuery({ query: breakpoints.tablet })
    const isDesktop = useMediaQuery({ query: breakpoints.desktop });

    const navigate = useNavigate();

    const thisDispatch = useDispatch()
    const { products, dispatch } = usePublic();
    const { privateDispatch, error, consumedProducts } = usePrivate();

    const [isDiaryMobileModalVisible, toggleisDiaryMobileModalVisible] = useToggle(false);
    // console.log("consumedProducts:", consumedProducts);

    useEffect(() => {
        if (isDiaryMobileModalVisible) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") toggleisDiaryMobileModalVisible();
        };

        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.body.classList.remove(styles.noScroll);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isDiaryMobileModalVisible, toggleisDiaryMobileModalVisible]);

    useEffect(() => {
        if (error === "Not authorized") {
            setTimeout(() => thisDispatch(logOut()), 3000);
        }
    }, [error, thisDispatch]);

    useEffect(() => {
        if (error === "Not authorized") {
            setTimeout(() => navigate("/login"), 5000);
        }
    }, [error, navigate]);

    function handleOpenModal() {
        toggleisDiaryMobileModalVisible()
    }

    const today = new Date().toISOString().split("T")[0];

    const [date, setDate] = useState(today);
    const [searchTerm, setSearchTerm] = useState("");
    const [quantity, setQuantity] = useState("");
    // console.log("date:", date);
    // console.log("quantity:", quantity);
    // console.log("searchTerm:", searchTerm);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products]);

    useEffect(() => {

        privateDispatch(fetchConsumedProductsForSpecificDay({ date: date }))
    }, [privateDispatch, date]);

    const allProducts = Array.isArray(products.data) ? products.data.flat() : [];
    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // console.log("products:", products);

    // console.log("allProducts:", allProducts);

    // console.log("filteredProducts:", filteredProducts);

    const handleAddProduct = () => {
        if (searchTerm && quantity) {
            privateDispatch(
                addConsumedProductForSpecificDay({
                    product: searchTerm,  // Send title (string) here
                    date,
                    quantity,
                })
            );
            setSearchTerm(""); // Clear selection
            setQuantity(""); // Reset quantity
        }
    };

    const handleDeleteProduct = (product, date) => {
        const productId = (productTitle) => {
            const foundProduct = allProducts.find((item) => item.title === productTitle);
            // console.log("Found product:", foundProduct);

            if (foundProduct) {
                // console.log("found");
                // console.log(foundProduct._id);

                return foundProduct._id; // Return the product's ID
            }
            // console.log("not found");

            return null; // Return null if no product is found
        };

        // console.log('delete');

        const id = productId(product)
        // console.log(id);


        privateDispatch(deleteConsumedProductForSpecificDay({ productId: id, date }));
        handleProductsForSelectedDate(date)
    };

    function handleProductsForSelectedDate(date) {
        setTimeout(() => {
            privateDispatch(fetchConsumedProductsForSpecificDay({ date: date }));
        }, 1000); // Delay of 500ms
    };

    function formatToDisplayDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
    }

    return (
        <section className={styles.section}>
            {isDiaryMobileModalVisible && isMobile && !isTablet && !isDesktop && (
                <div
                    className={styles.modalOverlay}
                >
                    <div className={styles.modalContent}>
                        <Modal
                            closeButton={styles.closeButton}
                            handleModalClose={toggleisDiaryMobileModalVisible}
                            isModalVisible={isDiaryMobileModalVisible}
                        >
                            {isMobile && (
                                <div className={styles.mobileHeaderCont}>
                                    <header className={styles.modalHeader}>
                                        <Logo className={styles.logoHeaderContainer} />
                                        <NavLinks />
                                    </header>
                                    <div className={styles.mobileSubHeaderCont}>
                                        <button onClick={toggleisDiaryMobileModalVisible} className={styles.mobileHeaderExitButton}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                <path d="M14 1.5V4.5H2M2 4.5L5.5 1M2 4.5L5.5 8" stroke="black" strokeWidth="2" />
                                            </svg>
                                        </button>
                                        <div className={styles.modalUserLogoutCont}>
                                            <UserLogout />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className={styles.modalLogoutActionCenter}>
                                <DiaryAddForm
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm} filteredProducts={filteredProducts}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    handleAddProduct={handleAddProduct}
                                    handleProductsForSelectedDate={handleProductsForSelectedDate}
                                    date={date}
                                />

                                <Button
                                    id="closeModal"
                                    handleClick={() => {
                                        toggleisDiaryMobileModalVisible();
                                        handleAddProduct();
                                        handleProductsForSelectedDate(date);
                                    }}
                                >
                                    Add
                                </Button>

                            </div>
                        </Modal>
                    </div>
                </div>
            )}

            <div className={styles.calculatorCont}>
                {isDesktop && (
                    <div className={styles.leftCont}>
                        <Logo />
                        <NavLinks />
                    </div>
                )}

                {error && <div className={styles.errorMessage}>{(error === 'Not authorized') ? <div className={styles.errorMessage}>
                    <p>
                        For reasons of personal data security Your authorisation has expired ! We will shortely redirect You to your login page. If you want to continue pleas login again ! Thank You for understanding !
                    </p>
                </div> : error}
                </div>}

                <div className={styles.diaryPage}>
                    <div className={styles.datePicker}>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Select Date"
                            max={new Date().toISOString().split("T")[0]}
                            className="custom-date-picker"
                        />
                        <FiCalendar className={styles.icon} />

                    </div>

                    {!isMobile && <DiaryAddForm
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm} filteredProducts={filteredProducts}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        handleAddProduct={handleAddProduct}
                        handleProductsForSelectedDate={handleProductsForSelectedDate}
                        date={date}
                    />}

                    <ul className={styles.productList}>
                        {consumedProducts.length > 0 ? (
                            consumedProducts.map((product, index) => (
                                <li key={index} className={styles.productRow}>
                                    <span className={styles.name}>{product?.productName ? product?.productName : product.product}</span>
                                    <div className={styles.right}>
                                        <span className={styles.quantity}>{product.quantity}g</span>
                                        <span className={styles.calories}>
                                            {product.calories}
                                            kcal
                                        </span>
                                        <button className={styles.delete} onClick={() => { handleDeleteProduct(product.product, date) }}>
                                            X
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className={styles.noProducts}>
                                There are no products consumed on the selected date !
                            </p>
                        )}
                    </ul>

                    {isMobile && (<Button handleClick={handleOpenModal} className={styles.plusButton} variant="plusButton">+</Button>)}
                </div>
            </div>

            <LoginStatistics day={formatToDisplayDate(date)} />
        </section>
    );
}
