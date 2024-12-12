import { selectorFamily, useRecoilValueLoadable } from 'recoil';

const fetchUser = async (userId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: error.message };
  }
};


const userSelector = selectorFamily({
  key: 'userSelector',
  get: (userId) => async ({ get }) => {
    const userData = await fetchUser(userId);
    return userData;
  },
});


function UserInfo({ userId }) {
  const userLoadable = useRecoilValueLoadable(userSelector(userId));

  switch (userLoadable.state) {
    case 'hasValue':
      const user = userLoadable.contents;
        if (user.error) {
            return <div>Error: {user.error}</div>
        }
      return (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      return <div>Error: {userLoadable.contents.message}</div>;
    default:
      return null;
  }
}

function SelectorFamilyApi() {
    return (
        <div>
            <UserInfo userId={1}/>
            <UserInfo userId={2}/>
            <UserInfo userId={999}/>
        </div>
    )
}

export default SelectorFamilyApi