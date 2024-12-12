import { atom, useRecoilCallback, useRecoilValue } from "recoil";

const fetchDataAtom = atom({
  key: "fetchDataAtom",
  default: null,
});

const Content = () => {
  const data = useRecoilValue(fetchDataAtom);
  return JSON.stringify(data);
};

function RecoilCallback() {
  const fetchData = useRecoilCallback(({ set }) => async () => {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    ).then((res) => res.json());
    set(fetchDataAtom, data);
  },[]);

  return (
    <>
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        <Content />
      </div>
    </>
  );
}

export default RecoilCallback;
