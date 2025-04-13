import { dateRangeOptions } from '@/app/utils/constants';
import ContentContainer from './contentContainer';
import FieldContainer from './fieldContainer';
import InputContainer from './inputContainer';
import InputSelectButton from './inputSelectButton';
import InputDateSelect from './inputDateSelect';

const DateSection = ({ date, updateDate }) => {
  return (
    <ContentContainer>
      <InputContainer>
        <FieldContainer>
          <InputSelectButton
            title={'Service Dates'}
            field={'type'}
            value={date.type}
            setValue={updateDate}
            options={dateRangeOptions}
            optionLabel={'label'}
          />
          <InputDateSelect
            title={date.type === 'multi' ? 'Start Date' : 'Choose service date'}
            field={'startDate'}
            value={date.startDate}
            setValue={updateDate}
            placeholder={
              date.startDate === 'multi' ? 'Start date' : 'Service Date'
            }
          />
          {date.type === 'multi' ? (
            <InputDateSelect
              title={'End Date'}
              field={'endDate'}
              value={date.endDate}
              setValue={updateDate}
              placeholder='End Date'
            />
          ) : null}
        </FieldContainer>
      </InputContainer>
    </ContentContainer>
  );
};

export default DateSection;
