import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function DronePartsLK() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(productList);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async () => {
    if (!name || !image || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        image,
        price,
        createdAt: new Date()
      });

      setName("");
      setImage("");
      setPrice("");

      alert("Product Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide text-green-400">
            Drone Parts LK
          </h1>

          <a
            href="https://wa.me/94750619800"
            className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-2xl font-semibold transition"
          >
            WhatsApp Order
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-cyan-500/10 z-10"
        />
        <img
          src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1600&auto=format&fit=crop"
          alt="Drone"
          className="w-full h-[500px] object-cover opacity-40"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center text-center px-6 z-20"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
              Drone Parts LK
            </h2>

            <p className="text-zinc-300 max-w-2xl mx-auto text-lg md:text-xl mb-8">
              High quality drone parts, FPV gear, ESCs, Motors,
              Flight Controllers and accessories in Sri Lanka.
            </p>

            <a
              href="https://wa.me/94750619800"
              className="bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-2xl text-lg font-bold transition"
            >
              Contact on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h3 className="text-4xl font-bold mb-8 text-center">
            Shop Categories
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                name: "Flight Stack",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
              },
              {
                name: "Flight Controller",
                image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?q=80&w=1200&auto=format&fit=crop"
              },
              {
                name: "ESC",
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop"
              },
              {
                name: "Frame",
                image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop"
              },
              {
                name: "Motors",
                image: "https://images.unsplash.com/photo-1527979809431-4aeec32d66ef?q=80&w=1200&auto=format&fit=crop"
              },
              {
                name: "VTX & Cam",
                image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1200&auto=format&fit=crop"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.08, rotate: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-green-400 transition duration-300 shadow-xl backdrop-blur-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-44 w-full object-cover hover:scale-110 transition duration-500"
                />

                <div className="p-4 text-center">
                  <p className="font-bold text-lg text-green-400">
                    {category.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <h3 className="text-4xl font-bold mb-10 text-center">
          Latest Products
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl transition duration-300 backdrop-blur-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h4 className="text-2xl font-bold mb-3">
                  {product.name}
                </h4>

                <p className="text-zinc-400 mb-6">
                  {product.price}
                </p>

                <a
                  href="https://wa.me/94750619800"
                  className="block text-center bg-green-500 hover:bg-green-400 text-black py-3 rounded-2xl font-semibold transition"
                >
                  Order Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900 py-16 px-6 text-center">
        <h3 className="text-4xl font-bold mb-6">
          Why Choose Us?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
          <div className="bg-black rounded-3xl p-8 border border-zinc-800">
            <h4 className="text-2xl font-bold mb-4">
              Fast Delivery
            </h4>

            <p className="text-zinc-400">
              Islandwide delivery across Sri Lanka.
            </p>
          </div>

          <div className="bg-black rounded-3xl p-8 border border-zinc-800">
            <h4 className="text-2xl font-bold mb-4">
              Quality Parts
            </h4>

            <p className="text-zinc-400">
              Trusted drone and FPV components.
            </p>
          </div>

          <div className="bg-black rounded-3xl p-8 border border-zinc-800">
            <h4 className="text-2xl font-bold mb-4">
              Support
            </h4>

            <p className="text-zinc-400">
              Quick customer support through WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-10 text-center text-zinc-500">
        <p className="text-lg font-semibold">Drone Parts LK</p>
        <p>Phone: 075 061 9800</p>
      </footer>
    </div>
  );
}
