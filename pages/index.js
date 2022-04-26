import Head from "next/head";
import Link from "next/link";
import { Item } from "../components/Item";
import { Nav } from "../components/Nav";
import { Total } from "../components/Total";
import { useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector, connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setCount } from "../store/actions/countAction";
import { setCart, fetchItems } from "../store/actions/cartAction";

import { wrapper } from "../store/store";

export default function Home(props) {
  const url = "./api/";
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const cartLocal = await response.json();
    setCartLocal(cartLocal);
    setLoading(false);
  };
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  useEffect(() => {
    fetchData();
    if (count.count === 0) {
      // to fetch data only once
      dispatch(fetchItems());
      dispatch(setCount("COUNT_INC"));
    }
  }, []);

  const [cartLocal, setCartLocal] = useState([]);
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart);
  const handleInc = (id) => {
    setCartLocal(
      cartLocal.map((i) => {
        if (i.id === id) {
          return { ...i, amount: i.amount + 1 };
        } else return { ...i };
      })
    );
  };

  const handleDec = (id) => {
    setCartLocal(
      cartLocal
        .map((i) => {
          if (i.id === id) {
            return { ...i, amount: i.amount === 0 ? 0 : i.amount - 1 };
          } else return { ...i };
        })
        .filter((i) => i.amount !== 0)
    );
  };

  const handleRemove = (id) => {
    setCartLocal(cartLocal.filter((i) => i.id !== id));
  };

  const handleClear = () => {
    setCartLocal([]);
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="comparaison">
          <div className="itemsCont">
            <Nav items={cartLocal} title="With useState" />
            {!loading ? (
              <>
                {cartLocal.map((i) => (
                  <Item
                    key={i.id}
                    item={i}
                    handleInc={handleInc}
                    handleDec={handleDec}
                    handleRemove={handleRemove}
                  />
                ))}
                {cartLocal.length > 0 && <hr className="hr" />}
                <div className="totalClear">
                  <Total items={cartLocal} />
                  {cartLocal.length > 0 && (
                    <button onClick={handleClear} className="clearButton">
                      Clear cart
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  marginTop: "50%",
                }}
              >
                ...Loading
              </div>
            )}
          </div>
          <div className="itemsCont">
            <Nav items={cart.cart} title="With Redux" />
            {cart.cart.map((i) => (
              <Item
                key={i.id}
                item={i}
                handleInc={() => dispatch(setCart("INC_ITEM", i.id))}
                handleDec={() => dispatch(setCart("DEC_ITEM", i.id))}
                handleRemove={() => dispatch(setCart("REMOVE_ITEM", i.id))}
              />
            ))}
            {cart.cart.length > 0 && <hr className="hr" />}
            <div className="totalClear">
              <Total items={cart.cart} />
              {cart.cart.length > 0 && (
                <button
                  onClick={() => dispatch(setCart("CLEAR_CART"))}
                  className="clearButton"
                >
                  Clear cart
                </button>
              )}
            </div>
          </div>
        </div>
        <Link href="/page2">
          <a style={{ textAlign: "center", marginBottom: "20px" }}>
            Go to page II to test
          </a>
        </Link>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  );
}
/*
export const getStaticProps = wrapper.getStaticProps((store) => () => {
  //store.dispatch(serverRenderClock(true))
  store.dispatch(setCount("COUNT_RESET"));
  //store.dispatch(setCart("CLEAR_CART"));
  store.dispatch(fetchItems(1)); //SSG 1 to use an asolute url for fetching data
});
*/
