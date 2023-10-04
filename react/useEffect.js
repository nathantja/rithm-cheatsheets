import { useEffect } from 'react';

// useEffect(myCallbackFn);
// Runs myCallbackFn effect after every render
function MyComponent() {
  useEffect(function myEffect() {
      // ...
    }
  );
  // ...
}

//useEffect(myCallbackFn, [productId, userId])
// Runs myCallbackFn effect only if productId or userId variables changed
function MyComponent() {
  useEffect(function myEffect() {
      // ...
    }, [pId, uId]);
  // ...
}


// useEffect(myCallbackFn, [ ])
// Runs myCallbackFn effect only the first time (on mount) after the render
function MyComponent() {
  useEffect(function myEffect() {
      // ...
    }, []);
  // ...
}


// async example
function ProfileViewer() {
  const [profile, setProfile] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function fetchUserWhenMounted() {
    async function fetchUser() {
      const response = await fetch(URL);
      const userResult = await response.json();
      setProfile({
        data: userResult,
        isLoading: false
      });
    }
    fetchUser();
  }, [ ]);

  if (profile.isLoading) return <i>Loading...</i>;

  return (
      <div>
        <b>{profile.data.name}</b>
      </div>
  );
}
