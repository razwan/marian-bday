import {
    useShortAnswerInput,
    useCheckboxInput,
    useGoogleForm,
    GoogleFormProvider,
    useLongAnswerInput,
  } from 'react-google-forms-hooks';
  
  import form from '../data/GoogleForm.json';
  
  type IFormInputs = {
    id: string;
  };
  
  const ShortAnswerInput = ({ id }: IFormInputs) => {
    const { register, label } = useShortAnswerInput(id);
  
    return (
        <div className="space-y-1">
            <div className='font-bold'>{ label }</div>
            <input className='w-full border border-neutral-300 py-2 px-4 rounded-md' type={ 'text' } { ...register() } />
        </div>
    )
  };

  const LongAnswerInput = ({ id }: IFormInputs) => {
    const { register, label } = useLongAnswerInput(id);
    return (
        <div className="space-y-1">
            <div className='font-bold'>{ label }</div>
            <textarea className='w-full border border-neutral-300 p-4 rounded-md' { ...register() } />
        </div>
    )
  };

  const CheckboxInput = ({ id }: IFormInputs) => {
    const { options, label } = useCheckboxInput(id);
  
    return (
        <div className="space-y-1">
            <div className='font-bold'>{ label }</div>
            <div>
                { options.map( option => {
                    return (
                        <div className='flex gap-2 items-center' key={ option.id }>
                            <input type="radio" id={ option.id } { ...option.registerOption() } />
                            <label htmlFor={ option.id }>{ option.label }</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
  };
  
  const Contactform = () => {
    const methods = useGoogleForm({ form: form as any });
  
    const onSubmit = async (data: any) => {
      await methods.submitToGoogleForms(data).then(() => {
        alert('Form submitted with success!');
      });
    };
    return (
      <div className="bg-neutral-50 border rounded-lg p-8">
        <GoogleFormProvider { ...methods }>
          <form id="ContactForm" onSubmit={ methods.handleSubmit(onSubmit) }>
            <div className='space-y-8'>
                <ShortAnswerInput id="662552907" />
                <CheckboxInput id="680857486" />
                <CheckboxInput id="1237840419" />
                <CheckboxInput id="1948574545" />
                <ShortAnswerInput id="59818467" />
                <CheckboxInput id="330377857" />
                <LongAnswerInput id="1850514433" />
    
                <div>
                    <button className="rounded-md bg-teal-800 text-teal-50 py-2 px-4" type="submit">Trimite</button>
                </div>
            </div>
          </form>
        </GoogleFormProvider>
      </div>
    );
  };
  
  export { Contactform };