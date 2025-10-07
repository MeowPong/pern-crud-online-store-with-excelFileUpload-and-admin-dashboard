import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import MyModal from "../components/MyModal";
import dayjs from "dayjs";

function Index() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]); // Items in Carts
  const [recordInCarts, setRecordInCarts] = useState(0);
  const [sumQty, setSumQty] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [payDate, setPayDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [payTime, setPayTime] = useState("");

  useEffect(() => {
    fetchData();
    fetchDataFromLocal();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/product/list");
      if (res.data.results !== undefined) {
        setProducts(res.data.results);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  function showImage(item) {
    if (item.img !== undefined) {
      let imgPath = config.apiPath + "/uploads/" + item.img;

      if (item.img === "") imgPath = "noImageAviable.png";

      return (
        <img className="card-img-top" height="300px" src={imgPath} alt="" />
      );
    }

    return <></>;
  }

  const addToCart = (item) => {
    let arr = carts;

    if (arr === null) {
      arr = [];
    }

    arr.push(item);

    setCarts(arr);
    setRecordInCarts(arr.length);

    localStorage.setItem("carts", JSON.stringify(carts));

    fetchDataFromLocal();
  };

  const fetchDataFromLocal = () => {
    const itemInCarts = JSON.parse(localStorage.getItem("carts"));

    if (itemInCarts !== null) {
      setCarts(itemInCarts);
      setRecordInCarts(itemInCarts !== null ? itemInCarts.length : 0);

      computePriceAndQty(itemInCarts);
    }
  };

  const computePriceAndQty = (itemInCarts) => {
    let sumQty = 0;
    let sumPrice = 0;

    for (let i = 0; i < itemInCarts.length; i++) {
      const item = itemInCarts[i];
      sumQty++;
      sumPrice += parseInt(item.price);
    }

    setSumPrice(sumPrice);
    setSumQty(sumQty);
  };

  const handleRemove = async (item) => {
    try {
      const button = await Swal.fire({
        title: "ลบสินค้า",
        text: "คุณต้องการลบสินค้าออกจากตะกร้าใช่หรือไม่",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        let arr = carts;

        for (let i = 0; i < arr.length; i++) {
          const itemInCart = arr[i];

          if (item.id === itemInCart.id) {
            arr.splice(i, 1);
          }
        }

        setCarts(arr);
        setRecordInCarts(arr.length);

        localStorage.setItem("carts", JSON.stringify(arr));

        computePriceAndQty(arr);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress,
        payDate: payDate,
        payTime: payTime,
        carts: carts,
      };

      const res = await axios.post(config.apiPath + "/api/sale/save", payload);

      if (res.data.message === "success") {
        localStorage.removeItem("carts");
        setRecordInCarts(0);
        setCarts([]);

        Swal.fire({
          title: "บันทึกข้อมูล",
          text: "ระบบได้บันทึกข้อมูลของคุณแล้ว",
          icon: "success",
        });

        document.getElementById("modalCart_btnClose").click();
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
        setPayDate(new Date());
        setPayTime("");
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-dark bg-secondary"
        style={{ height: "4rem" }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* โลโก้ / ชื่อร้าน */}
          <p className="navbar-brand h3 mb-0" >
            <span className="fs-3">🏪</span> MeowPongShop 
          </p>

          {/* ส่วนตะกร้า */}
          <div className="d-flex align-items-center">
            <span className="me-2 text-white">ตะกร้าของฉัน</span>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalCart"
              className="btn btn-outline-light d-flex align-items-center"
            >
              <i className="fa fa-shopping-cart me-2"></i>
              {recordInCarts}
            </button>
            <span className="ms-2 text-white">ชิ้น</span>
          </div>
        </div>
      </nav>

      <div className="clearfix"></div>

      <div className="container mt-3">
        <div className="row">
          {products.length > 0 ? (
            products.map((item) => (
              <div className="col-3 mt-3" key={item.id}>
                <div className="card">
                  {showImage(item)}
                  <div className="card-body">
                    <div>{item.name}</div>
                    <div>{item.price.toLocaleString("th-TH")}</div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => addToCart(item)}
                      >
                        <i className="fa fa-shopping-cart me-2"></i>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <MyModal id="modalCart" title="ตะกร้าสินค้าของฉัน">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>name</th>
              <th className="text-end">price</th>
              <th className="text-end">qty</th>
              <th width="60px"></th>
            </tr>
          </thead>
          <tbody>
            {carts.length > 0 ? (
              carts.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="text-end">
                    {item.price.toLocaleString("th-TH")}
                  </td>
                  <td className="text-end">1</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleRemove(item)}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>

        <div className="text-center">
          จำนวน {sumQty} รายการ เป็นเงิน {sumPrice} บาท
        </div>

        <div className="mt-3">
          <div className="alert alert-info">
            <div>โปรดโอนเงินไปยังบัญชี</div>
            <div>กสิกรไทย นายแมวโพง น่าจกพุง</div>
            <div>เลขบัญชี 425-344-4456</div>
          </div>
          <div className="mt-3">
            <div>ชื่อผู้ซื้อ</div>
            <input
              className="form-control"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div>เบอร์โทรติดต่อ</div>
            <input
              className="form-control"
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div>ที่อยู่จัดส่ง</div>
            <input
              className="form-control"
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div>วันที่โอน</div>
            <input
              className="form-control"
              type="date"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div>เวลาที่โอนเงิน</div>
            <input
              className="form-control"
              onChange={(e) => setPayTime(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleSave}>
            <i className="fa fa-check me-2"></i>ยืนยันการซื้อ
          </button>
        </div>
      </MyModal>
    </>
  );
}

export default Index;
