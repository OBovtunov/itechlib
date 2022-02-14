package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.SuggestedBookDto;
import by.library.itechlibrary.dto.book.WithOwnerBookDto;
import by.library.itechlibrary.entity.SuggestedBook;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SuggestedBookMapper {

    @Named(value = "suggested-book")
    SuggestedBookDto toSuggestedBookDto(SuggestedBook suggestedBook);

    @Named(value = "suggestedBookDto")
    SuggestedBook toSuggestedBook(SuggestedBookDto suggestedBookDto);

    @IterableMapping(qualifiedByName = "suggested-book")
    List<SuggestedBookDto> mapSuggestedBookDtoList(List<SuggestedBook> suggestedBooks);

    @IterableMapping(qualifiedByName = "suggestedBookDto")
    List<SuggestedBook> mapSuggestedBookList(List<SuggestedBookDto> suggestedBookDtos);

}