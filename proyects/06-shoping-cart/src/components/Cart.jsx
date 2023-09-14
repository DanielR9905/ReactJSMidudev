import { useId } from "react";
import './Cart.css'
import { CartIcon, ClearCartIcon } from "./Icons";

export function Cart() {
    const cartCheckBoxId = useId()
  return (
    <>
        <label className="cart-button" htmlFor={cartCheckBoxId}>
            <CartIcon/>
        </label>
        <input type="checkbox" id={cartCheckBoxId}  hidden/>

        <aside className="cart">
            <ul>
                <li>
                    <img src="https://i.dummyjson.com/data/products/7/thumbnail.jpg" alt="iphone" />
                    <div>
                        <strong>iPhone</strong> - $1420
                    </div>

                    <footer>
                        <small>
                            Qty: 1
                        </small>
                        <button>+</button>
                    </footer>
                </li>
            </ul>
            <button>
                <ClearCartIcon/>
            </button>
        </aside>
    </>
  )
}
