"use client";
import Background from "@/components/Background";
import HistoryBackBtn from "@/components/HistoryBackBtn";
import { useCart } from "@/components/Hooks/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen w-full relative pb-[10vh]">
      <Background/>
      <div className="fixed top-[10vh] left-1/2 -translate-x-1/2">
          <h1 className="text-[22vw] leading-[20vw] font-bebas opacity-1 relative text-center">
            Cart
          </h1>
        </div>
      <div className="ml-5 relative z-10"><HistoryBackBtn text="Back to shopping" />
      </div>
      <div className="container mx-auto w-[90%] pt-[24vh] relative">
        <h1 className="text-white  text-4xl font-bebas ml-7">Cart</h1>
        <div className="w-full flex gap-10 mt-7 relative">
          <div className="w-7/12 relative">
            <div className="flex flex-col gap-5">
              {cart.length === 0 ? (
                <div className="text-white ml-7 text-lg font-medium">Your cart is empty. </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white/6 rounded-[15px] px-7 py-3 gap-6 card-shadow">
                    <div className="w-20 h-20 relative rounded overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-contain" />
                    </div>
                    <div className="flex-1 h-full relative">
                      <div className="font-medium text-lg ">{item.title}</div>
                      <div className="flex items-center gap-3 mt-1 relative">
                        <span className="text-s cursor-pointer">{item.size}</span>
                        <span className="flex items-center gap-1 text-xs text-white border-l  border-[#c5c5c5]/50 pl-3 cursor-pointer">
                          <span className="w-5 h-5 rounded-full border-3 border-white inline-block" style={{ background: item.color }}></span>
                          {item.colorName || item.color}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 relative">
                      <span className="text-white text-lg font-semibold">{item.qty}</span>
                      <div className="flex-center flex-col gap-1 "><button
                        className="text-white text-xl cursor-pointer"
                        onClick={() => updateQty(idx, Math.max(1, item.qty - 1))}
                      >
                        <Image src="/assets/up.svg" alt="minus" width={16} height={16} />
                      </button>

                        <button
                          className="text-white text-xl cursor-pointer"
                          onClick={() => updateQty(idx, item.qty + 1)}
                        >
                          <Image src="/assets/down.svg" alt="plus" width={16} height={16} />
                        </button></div>
                    </div>
                    <div className="text-white text-sm font-medium w-20 text-end">${item.price * item.qty}</div>
                    <button
                      className="text-white text-xl ml-4 cursor-pointer"
                      onClick={() => removeFromCart(idx)}
                      title="Remove"
                    >
                      <Image src="/assets/trash.svg" alt="trash" width={24} height={24} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-5/12 relative card-shadow bg-white/6 rounded-[15px] px-8 py-12 flex flex-col gap-8">
            <div className="flex justify-between items-start gap-2 relative">
              <div>
                <h3 className="font-medium text-lg">Subtotal ({cart.length} Item{cart.length !== 1 ? "s" : ""})</h3>
                <div className="text-xs font-light text-white/60">+ Inclusive of VAT</div>
              </div>
              <div className="text-sm text-white font-medium">${subtotal}</div>
            </div>
            <div className="flex flex-col gap-5 relative w-full">
              <div className="text-white text-lg font-medium">Payment Methods</div>
              <div className="flex-center gap-4 mb-2 h-full relative">
                <button className="w-full relative bg-white/5 h-full text-white py-2 flex items-center justify-center gap-2 focus:border-white/40 focus:border-[0.5px] cursor-pointer">
                  <Image src="/assets/CreditCard.svg" alt="visa" width={32} height={20} />
                  <span>Credit Card</span>
                </button>
                <button className="w-full relative bg-white/5 h-full text-white py-2  flex items-center justify-center gap-2 focus:border-[0.5px] focus:border-white/40 text-sm cursor-pointer">
                  <Image src="/assets/paypal.svg" alt="PayPal" width={100} height={100} className="object-contain" />

                </button>
              </div>
              <form className="flex flex-col gap-7 relative">
                <div className="flex flex-col gap-1">
                  <label htmlFor="card-name" className="text-sm font-medium ">Name on card</label>
                  <input className="bg-white/5 text-white px-5 py-3 rounded text-xs" name="card-name" id="card-name" placeholder="Name" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="card-number" className="text-sm font-medium ">Card Number</label>
                  <input className="bg-white/5 text-white px-5 py-3 rounded text-xs" name="card-number" id="card-number" placeholder="Card Number" />
                </div>
                <div className="flex items-center w-full relative gap-8">
                  <div className="flex flex-col gap-1 flex-1">
                    <label htmlFor="expiration-date" className="text-sm font-medium ">Expiration Date (MM/YY)</label>
                    <input className="bg-white/5 text-white px-5 py-3 rounded w-full text-xs" name="expiration-date" id="expiration-date" placeholder="Expiration Date (MM/YY)" />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label htmlFor="cvv" className="text-sm font-medium ">CVV</label>
                    <input className="bg-white/5 text-white px-5 py-3 rounded w-full text-xs " name="cvv" id="cvv" placeholder="CVV" />
                  </div>
                </div>
                <button type="button" className=" text-white py-3 px-4 font-bold bg-dark-pink-500 font-medium text-white transition-colors mt-4 py-3 px-4 min-h-16 cursor-pointer">
                  Check out now
                </button>
              </form>
            </div>
          </div>
        </div></div>

    </div>
  );
}
