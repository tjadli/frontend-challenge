/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import styledComponents from 'styled-components';

import { Checkmark, Xmark } from '../../assets/Icons';

const STEPS_COUNT = 4;
export default function Progress() {
  const currentStep = useSelector((state) => state.step);
  const error = useMatch('/error');

  return (
    <Wrapper>
      {[...Array(STEPS_COUNT).keys()].map((step) => (
        <StepContainer key={step} step={step}>
          <Bubble step={step} checked={currentStep >= step} error={currentStep === step && error}>
            {
              currentStep === step && error
                ? <Xmark width={20} height={20} />
                : ((currentStep > step || currentStep === STEPS_COUNT - 1)
                  ? <Checkmark width={20} height={20} /> : null)
            }

          </Bubble>
          {step < STEPS_COUNT - 1 ? (<Line checked={currentStep > step} />) : null}
        </StepContainer>

      ))}
    </Wrapper>
  );
}

const StepContainer = styledComponents.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex:${(props) => (props.step < STEPS_COUNT - 1 ? 1 : 0)};
  flex-direction: row;
`;

const Line = styledComponents.div`
  height:2px;
  margin-horizontal: 10px;
  background-color:  ${(props) => (props.checked ? 'green' : '#9da0a3')};
  display: flex;
  flex: 1;
`;

const Bubble = styledComponents.div`
  height: 24px;
  width: 24px;
  flex-basis: 24px;
  color: #fff;
  border-radius: 12px;
  background-color: ${(props) => (props.error ? 'red' : (props.checked ? 'green' : '#fff'))} ;
  border-color:  ${(props) => (props.error ? 'red' : (props.checked ? 'green' : '#9da0a3'))};
  border-style: solid;
  border-width: 2px;
  padding: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styledComponents.div`
  display: flex;
  margin: 25px 35px;
  justify-content: space-between;
  flex:1;
  border-color:red;
  border-width:1px;
`;
