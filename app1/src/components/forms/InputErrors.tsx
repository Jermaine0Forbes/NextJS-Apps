'use client'

export default function InputErrors(props: {errors : Array<string> | undefined})
{
    const { errors} = props;
    if(errors === undefined || errors?.length == 0 )
    {
        return <span></span>;
    }

    // const Errors = errors.map((e,i) => ( <p key={i} className="text-red-200">{e}</p>));
    if(Array.isArray(errors)){

        return(
              errors.map((e,i) => ( <p key={i} className="text-red-200">{e}</p>)) 
        );

    }
}