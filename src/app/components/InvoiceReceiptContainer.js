import InvoiceServiceContainer from './InvoiceServiceSection';
import InvoiceTotalsSection from './InvoiceTotalsSection';

const InvoiceReceiptContainer = ({ job }) => {
  const { services } = job;
  return (
    <div style={{ padding: 20 }}>
      <InvoiceServiceContainer services={services} />
      <InvoiceTotalsSection />
    </div>
  );
};

export default InvoiceReceiptContainer;
