package by.library.itechlibrary.dto.booking.bookinginfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseBookingInfoDto {

    private LocalDate bookingEndDate;

}