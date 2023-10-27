    // css properties as OBjects
  const mainContainer: React.CSSProperties = {
    border: '1px solid white',
    display:"inline-flex",

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
  
  };

  const genderContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };


export  {
  mainContainer,
  formContainer,
  genderContainer,
};