import { Button } from 'primereact/button';
import TaxAndFeeRow from './taxAndFeeRow';

const TaxesAndFeesSection = ({
  taxesAndFees,
  addTaxAndFee,
  saveTaxAndFee,
  deleteTaxAndFee,
  updateIsAnyEditing,
  removeIsAnyEditing,
}) => {
  return (
    <div>
      {taxesAndFees.map((taxAndFee, index) => {
        return (
          <TaxAndFeeRow
            taxAndFeeObj={taxAndFee}
            key={taxAndFee.identifier || crypto.randomUUID()}
            taxesAndFees={taxesAndFees}
            saveTaxAndFee={saveTaxAndFee}
            deleteTaxAndFee={deleteTaxAndFee}
            updateIsAnyEditing={updateIsAnyEditing}
            index={index}
            removeIsAnyEditing={removeIsAnyEditing}
          />
        );
      })}
      <Button onClick={() => addTaxAndFee()}>Add Tax or Fee</Button>
    </div>
  );
};

export default TaxesAndFeesSection;
