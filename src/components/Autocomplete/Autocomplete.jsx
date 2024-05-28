import React from "react";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

import s from './Autocomplete.module.css';
//import { useEffect } from "react";

export const Autocomplete = ({isLoaded, onSelect}) =>{
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
      } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
      });
      const ref = useOnclickOutside(() => {
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
      };
    
      const handleSelect =
        ({ description }) =>
        () => {
          // When the user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(description, false);
          clearSuggestions();
          console.log(description);
    
          // Get latitude and longitude via utility functions
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng });
            onSelect({ lat, lng })
          })
          .catch((error) => {
            console.log(' Error: ', error);
          }); 
        };
    
      const renderSuggestions = () =>
        data.map((suggestions) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestions;
    
          return (
            <li className={s.listitem} key={place_id} onClick={handleSelect(suggestions)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        });
    
    React.useEffect(() => {
        if(isLoaded) {
            init()
        }
    }, [isLoaded, init])    

    return <div className={s.root} ref={ref}>
        <input 
        type="text" 
        className="s.input"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
        />
        {status === "OK" && <ul className={s.suggestions}>{renderSuggestions()}</ul>}
    </div>
}