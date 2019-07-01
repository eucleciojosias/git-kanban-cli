import styled from 'styled-components';
import colors from '../../styles/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    left: 170px;
    height: 25px;
    width: 25px;
    background: #008DDE;
    border-radius: 50%;

    p {
      color: #FFF;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 20px solid #E5E5E5;
  border-right: 2px solid #E5E5E5;
  border-bottom: 20px solid #E5E5E5;
  border-left: 2px solid #E5E5E5;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;

  .header {
    position: absolute;
    top: -20px;
    right: 10px;

    strong {
      font-size: 12px;
      font-weight: 700;
      color: #747B84;
    }
  }
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 18px;
    font-weight: 700;
    color: #747B84;
  }

  p {
    font-size: 16px;
    color: #9A97A7;
  }
`;

export const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;

  img {
    height: 25px;
    border-radius: 50%;
  }
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Label = styled.div`
  border: 1px solid ${({ type }) => (type === 'Frontend' && colors.FRONTEND)
    || (type === 'Backend' && colors.BACKEND)
    || (type === 'Devops' && colors.DEVOPS)
    || (type === 'Highest' && colors.HIGHEST)
    || (type === 'High' && colors.HIGH)
    || (type === 'Medium' && colors.MEDIUM)
    || (type === 'UX' && colors.UX)
    || (type === 'Bug' && colors.BUG)
    || (type === 'NewFeature' && colors.NEWFEATURE)
    || (type === 'Improvement' && colors.IMPROVEMENT)
    || (type === 'Maintenance' && colors.MAINTENANCE)
    || (type === 'ResellerDemand' && colors.RESELLER)
};
  border-radius: 5px;
  padding: 2px;
  margin-right: 4px;
  color: ${({ type }) => (type === 'Frontend' && colors.FRONTEND)
    || (type === 'Backend' && colors.BACKEND)
    || (type === 'Devops' && colors.DEVOPS)
    || (type === 'Highest' && colors.HIGHEST)
    || (type === 'High' && colors.HIGH)
    || (type === 'Medium' && colors.MEDIUM)
    || (type === 'UX' && colors.UX)
    || (type === 'Bug' && colors.BUG)
    || (type === 'NewFeature' && colors.NEWFEATURE)
    || (type === 'Improvement' && colors.IMPROVEMENT)
    || (type === 'Maintenance' && colors.MAINTENANCE)
    || (type === 'ResellerDemand' && colors.RESELLER)
};

    p {
      font-size: 10px;
    }
`;

export const Stage = styled.div`
  border: 1px solid ${({ type }) => (type === 'Review' && colors.REVIEW)
    || (type === 'Progress' && colors.INPROGRESS)
    || (type === 'Testing' && colors.TESTING)
};
  border-radius: 5px;
  padding: 2px;
  margin-right: 4px;
  color: ${({ type }) => (type === 'Review' && colors.REVIEW)
    || (type === 'Progress' && colors.INPROGRESS)
    || (type === 'Testing' && colors.TESTING)
};

    p {
      font-size: 10px;
    }
`;
