import { Button } from 'primereact/button';
import TaxAndFeeRow from './taxAndFeeRow';

const TaxesAndFeesSection = ({
  taxesAndFees,
  addTaxAndFee,
  saveTaxAndFee,
  deleteTaxAndFee,
}) => {
  return (
    <div>
      {taxesAndFees.map((taxAndFee, index) => {
        return (
          <TaxAndFeeRow
            key={taxAndFee?.identifier || crypto.randomUUID()}
            taxAndFeeObj={taxAndFee}
            taxesAndFees={taxesAndFees}
            saveTaxAndFee={saveTaxAndFee}
            deleteTaxAndFee={deleteTaxAndFee}
          />
        );
      })}
      <Button onClick={() => addTaxAndFee()}>Add Tax or Fee</Button>
    </div>
  );
};

export default TaxesAndFeesSection;
