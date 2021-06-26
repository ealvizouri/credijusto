import React, { useState, useReducer, useCallback, useEffect, createRef } from 'react';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    default:
      const newState = [...state, action.payload];
        return newState;
  }
}

const Form = ({initialValues = {}, onFinish = null, validation = {}, className, children}) => {
    const [refs, dispatchRefs] = useReducer(reducer, initialState);

    const [mutatedChildren, setMutatedChildren] = useState(null);
    const mapChildren = useCallback((children) => {
        return React.Children.map(children, child => {
            if (!React.isValidElement(child)) return child;
            if (child.type.render && child.type.render.name === 'Input') {
                const newRef = createRef();
                const newProps = { ref: newRef };
                if (initialValues.hasOwnProperty(child.props.name)) {
                    newProps.initialValue = initialValues[child.props.name];
                }
                dispatchRefs({payload: newRef});
                return React.cloneElement(child, newProps);
            } else {
                return React.cloneElement(child, {
                    children: mapChildren(child.props.children)
                });
            }
        });
    }, [initialValues]);
    
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const values = {};
        let errors = 0;
        refs.forEach(ref => {
            if (ref && ref.current) {
                const { name, value } = ref.current;
                values[name] = value;
                if (validation.hasOwnProperty(name)) {
                    if (validation[name](value)) {
                        ref.current.classList.remove('form-item-error');
                    } else {
                        ref.current.classList.add('form-item-error');
                        errors++;
                    }
                }
            }
        })
        
        if (onFinish && errors === 0) {
            console.log('Form -> onFinish: ', values);
            onFinish(values)
        }
    }, [refs, onFinish, validation]);

    useEffect(() => {
        setMutatedChildren(mapChildren(children));
    }, [mapChildren, children]);

    return (<form className={className} onSubmit={onSubmit}>
        {mutatedChildren}
    </form>);
}

export default Form;