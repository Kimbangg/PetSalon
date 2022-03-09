import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useHistory, useParams, Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNav } from '@/Components/Common';
import { SEARCH_ALERT_MSG } from '@/utils/constants.js';
import { searchAll } from '@/apis/search';
import useForm from '@/hooks/useForm';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const { REACT_APP_CHANNEL_ID, PUBLIC_URL } = process.env;
  const defaultSearchImage = `${PUBLIC_URL}/images/defaultSearch.png`;
  const history = useHistory();
  const UrlParams = useParams();

  const onSubmit = async formData => {
    try {
      setIsEmptyResult(false);

      const isValidKeywordLength = formData.keyword.length < 2;

      if (isValidKeywordLength) {
        alert(SEARCH_ALERT_MSG.NO_BLANK);
        return;
      }

      const { keyword } = formData;
      const searchData = await searchAll({ keyword });

      history.push(`/search/${keyword}`);

      const filteredSearchData = searchData.filter(
        ({ channel }) => channel === REACT_APP_CHANNEL_ID,
      );

      if (!filteredSearchData.length) {
        setIsEmptyResult(true);
        return;
      }

      setSearchResult(filteredSearchData);
    } catch (error) {
      alert(SEARCH_ALERT_MSG.TRY_AGAIN);
    }
  };

  useEffect(() => {
    if (UrlParams.keyword) {
      onSubmit(UrlParams);
    }
  }, []);

  const { handleTextChange, handleSubmit } = useForm({
    initialValues: { keyword: '' },
    onSubmit,
  });

  return (
    <SearchPageWrapper>
      <Form onSubmit={handleSubmit}>
        <Input name="keyword" onChange={handleTextChange} />
        <button type="submit">
          <StyledSearchIcon />
        </button>
      </Form>
      {isEmptyResult ? (
        <SearchNotFound>해당하는 검색 결과를 찾을 수 없습니다.</SearchNotFound>
      ) : (
        <SearchCardListWrapper>
          <SearchCardList>
            {searchResult.map(({ _id, image, title }) => (
              <SearchCardWrapper key={_id}>
                <Link to={`/post/${_id}`}>
                  <ImageWrapper>
                    <Image src={image || defaultSearchImage} alt={title} />
                  </ImageWrapper>
                </Link>
              </SearchCardWrapper>
            ))}
          </SearchCardList>
        </SearchCardListWrapper>
      )}
      <BottomNav />
    </SearchPageWrapper>
  );
};

export default SearchPage;

const SearchPageWrapper = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 1rem;
  height: 2.75rem;
  position: relative;
`;

const Input = styled.input`
  background-color: #f5f5f5;
  border: 0;
  border-radius: 1rem;
  height: 100%;
  outline: 0;
  padding-left: 1rem;
  width: 85%;
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: #c4c4c4;
  height: 1.25rem;
  position: absolute;
  right: 1rem;
  top: 0.75rem;
  width: 1.25rem;
`;

const SearchNotFound = styled.div`
  width: 100%;
  margin-top: 5rem;
  font-size: 1rem;
  word-break: wrap;
  text-align: center;
`;

const SearchCardListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 2.5rem;
  width: 100%;
  margin-bottom: 2rem;
`;

const SearchCardList = styled.ul`
  text-align: center;
`;

const SearchCardWrapper = styled.div`
  display: inline-block;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  width: 6rem;
  height: 6rem;
  margin: 0.125rem;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
