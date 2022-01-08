import React from 'react'
import styled from 'styled-components'

function Label({ label }: { label: string }) {
    return (<LabelField>{label}</LabelField>)
}

export default Label
const LabelField = styled.label`
margin: 0 0 4px 2px;
font-size: .8rem;
font-weight: 600;
`;