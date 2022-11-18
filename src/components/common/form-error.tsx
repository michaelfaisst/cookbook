import React from "react";

interface Props {
    error?: string;
}

const FormError = ({ error }: Props) => {
    if (!error) {
        return null;
    }

    return <p className="mt-1 text-sm text-red-600">{error}</p>;
};

export default FormError;
