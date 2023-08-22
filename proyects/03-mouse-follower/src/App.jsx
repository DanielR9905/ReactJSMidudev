import { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enabled, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("effect ", { enabled });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    //cleanup
    //-> Cuando el componente se desmonta
    //-> Cuando cambian las dependencias, antes de ejecutar
    // el efecto de nuevo
    return () => {
      console.log("cleanup");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);



  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <button
        onClick={() => {
          setEnable(!enabled);
        }}
      >
        {enabled ? "Desactivar " : "Activar "}
        seguir puntero
      </button>
    </>
  );
};

function App() {
  const [mounted, setMounted] = useState(true)
  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={()=>setMounted(!mounted)}>Toogle mounted FollowMouse component</button>
    </main>
  );
}

export default App;
