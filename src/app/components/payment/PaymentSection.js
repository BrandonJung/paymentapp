import { paymentOptions } from '@/app/utils/constants';
import ContentContainer from '../form/contentContainer';
import FieldContainer from '../form/fieldContainer';
import InputContainer from '../form/inputContainer';
import InputSelectButton from '../form/inputSelectButton';

const PaymentSection = ({
  paymentInformation,
  updatePaymentInformation,
  disableEditing = false,
}) => {
  return (
    <ContentContainer>
      <InputContainer>
        <FieldContainer>
          <InputSelectButton
            title={'Payment Method'}
            field={'method'}
            value={paymentInformation.method}
            setValue={updatePaymentInformation}
            options={paymentOptions}
            optionLabel={'label'}
            disabled={disableEditing}
          />
        </FieldContainer>
      </InputContainer>
    </ContentContainer>
  );
};

export default PaymentSection;
