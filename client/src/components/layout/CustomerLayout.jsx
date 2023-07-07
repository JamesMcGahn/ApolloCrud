import CustomerNav from './CustomerNav';

function CustomerLayout({ children }) {
  return (
    <>
      <CustomerNav />
      {children}
    </>
  );
}
export default CustomerLayout;
