package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.UserDto;
import by.library.itechlibrary.entity.User;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Named(value = "user")
    UserDto map(User user);

    @Named(value = "userDto")
    User toUser(UserDto userDto);

    @IterableMapping(qualifiedByName = "user")
    List<UserDto> mapUserDtoList(List<User> users);

    @IterableMapping(qualifiedByName = "userDto")
    List<User> mapUserList(List<UserDto> userDtos);

}