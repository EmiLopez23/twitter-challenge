import React, { ChangeEvent, useState } from "react";
import SearchResultModal from "./search-result-modal/SearchResultModal";
import { Author } from "../../service";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { useTranslation } from "react-i18next";
import { StyledSearchBarContainer } from "./SearchBarContainer";
import CustomField from "../input-element/CustomField";
import { InputContainerMode } from "../input-element/StyledInputContainer";

export const SearchBar = () => {
  const [results, setResults] = useState<Author[]>([]);
  const [query, setQuery] = useState<string>("");
  const service = useHttpRequestService();
  let debounceTimer: NodeJS.Timeout;
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value;

    setQuery(inputQuery);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        if (inputQuery.length === 0) return;
        setResults(await service.searchUsers(inputQuery, 4, 0));
      } catch (error) {
        console.log(error);
      }
    }, 300);
  };

  return (
    <StyledSearchBarContainer>
      <CustomField
        mode={InputContainerMode.ROUNDED}
        required={false}
        name="search"
        onChange={handleChange}
        value={query}
        placeholder={t("placeholder.search")}
      />
      <SearchResultModal show={query.length > 0} results={results} />
    </StyledSearchBarContainer>
  );
};
