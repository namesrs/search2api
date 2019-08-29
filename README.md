![Alt text](screenshot.png?raw=true "Title")

# search2api
Sample for one way to use the SearchDomain command to check domain name availability


# Requirements

PHP >= 5.4 (compatible with 7.* up to 7.3)

php-curl

php-intl

php-mbstring

Allowed port 43 in firewall

# Instructions

1) Download this project
2) Add the required WHOIS library via composer
```
composer require io-developer/php-whois
```
3) Edit the config.php with your personal api credentials and other configuration options.
4) Optional. You may also want to edit the index.html file with information related to your brand
5) Optional. If you want to add a specific TLD you can edit the tlds.txt file.
6) Done!


# Order process

This sample includes a shopping cart view that can POST to your specific order system.
